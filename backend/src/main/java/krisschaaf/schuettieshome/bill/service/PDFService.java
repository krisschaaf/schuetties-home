package krisschaaf.schuettieshome.bill.service;

import krisschaaf.schuettieshome.bill.model.Bill;
import krisschaaf.schuettieshome.bill.utils.Converter;
import krisschaaf.schuettieshome.bill.utils.PDFInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.util.Base64;
import java.util.Date;

@Component
public class PDFService {

    SpringTemplateEngine springTemplateEngine;

    @Autowired
    public PDFService(SpringTemplateEngine springTemplateEngine) {
        this.springTemplateEngine = springTemplateEngine;
    }

    public String savePDF(Bill bill) {
        Context context = createContext(bill);

        var filename = new String(bill.getId() +  ".pdf");
        var filepath = new String("src/main/resources/pdf-files//" + filename);

        var htmlContent = springTemplateEngine.process("car-bill-template", context);
        try {
            var xHtmlContent = Converter.htmlToXHtml(htmlContent);
            Converter.htmlToPDF(xHtmlContent, filepath, PDFInfo.getDefaultPDFInfo(bill));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return filepath;
    }

    private static Context createContext(Bill bill) {
        var context = new Context();

        context.setVariable("customer", bill.getCustomer());
        context.setVariable("paymentAmount", bill.getPaymentAmount());
        context.setVariable("billedCars", bill.getBilledCars());
        context.setVariable("todayDate", new Date());
        context.setVariable("photoData", Base64.getEncoder().encodeToString(bill.getBilledCars().get(1).getCar().getPhoto().getData()));
        context.setVariable("photoType",bill.getBilledCars().get(1).getCar().getPhoto().getType());

        return context;
    }

    private static String buildDateString(Date date) {
        return String.valueOf(date.getDay() + '.' + date.getMonth() + '.' + date.getYear());
    }
}
