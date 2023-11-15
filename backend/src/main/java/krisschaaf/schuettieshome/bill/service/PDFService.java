package krisschaaf.schuettieshome.bill.service;

import com.itextpdf.html2pdf.HtmlConverter;
import krisschaaf.schuettieshome.bill.model.Bill;
import krisschaaf.schuettieshome.bill.model.BilledCar;
import krisschaaf.schuettieshome.bill.utils.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class PDFService {

    SpringTemplateEngine springTemplateEngine;

    @Autowired
    public PDFService(SpringTemplateEngine springTemplateEngine) {
        this.springTemplateEngine = springTemplateEngine;
    }

    public byte[] createPDFByteArray(Bill bill) throws UnsupportedEncodingException {
        Context context = createContext(bill);

        var out = new ByteArrayOutputStream();

        var htmlContent = springTemplateEngine.process("car-bill-template", context);
        var xHtmlContent = Converter.htmlToXHtml(htmlContent);

        HtmlConverter.convertToPdf(xHtmlContent, out);

        return out.toByteArray();
    }

    private static String generateImageData(BilledCar billedCar) {
        String type = billedCar.getCar().getPhoto().getType();
        String encodedData = billedCar.getCar().getPhoto().getEncodedData();
        return "data:" + type + ";base64," + encodedData;
    }

    private static Context createContext(Bill bill) {
        var context = new Context();
        long fullPayment = 0;
        List<String> imageData = new ArrayList<>();

        for (BilledCar billedCar: bill.getBilledCars()) {
            fullPayment += billedCar.getPricePerCar(bill.getPricePerMonthAsLong());
            imageData.add(generateImageData(billedCar));
        }

        context.setVariable("customer", bill.getCustomer());
        context.setVariable("pricePerMonth", bill.getPricePerMonth());
        context.setVariable("pricePerMonthAsLong", bill.getPricePerMonthAsLong());
        context.setVariable("fullPayment", fullPayment);
        context.setVariable("billedCars", bill.getBilledCars());
        context.setVariable("todayDate", Converter.dateToString(new Date()));
        context.setVariable("imageData", imageData);

        return context;
    }
}
