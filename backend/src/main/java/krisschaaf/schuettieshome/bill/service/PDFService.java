package krisschaaf.schuettieshome.bill.service;

import krisschaaf.schuettieshome.bill.model.Bill;
import krisschaaf.schuettieshome.bill.utils.Converter;
import krisschaaf.schuettieshome.bill.utils.PDFInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;

@Component
public class PDFService {

    SpringTemplateEngine springTemplateEngine;

    @Autowired
    public PDFService(SpringTemplateEngine springTemplateEngine) {
        this.springTemplateEngine = springTemplateEngine;
    }

    public String savePDF(Bill bill) throws IOException {
        Context context = createContext(bill);

        var filename = new String(bill.getId() +  ".pdf");
        var filepath = new String("src/main/resources/pdf-files//" + filename);

        var htmlContent = springTemplateEngine.process("car-bill-template", context);
        var xHtmlContent = Converter.htmlToXHtml(htmlContent);

        var cssContent = new String(Files.readAllBytes(Paths.get("src/main/resources/templates/car-bill-template.css")));

        Converter.htmlToPDF(xHtmlContent, cssContent, filepath, PDFInfo.getDefaultPDFInfo(bill));

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
