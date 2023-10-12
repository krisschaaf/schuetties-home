package krisschaaf.schuettieshome.bill.service;

import com.itextpdf.text.DocumentException;
import krisschaaf.schuettieshome.bill.model.Bill;
import krisschaaf.schuettieshome.bill.utils.Converter;
import krisschaaf.schuettieshome.bill.utils.PDFInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import java.io.IOException;

@Component
public class PDFService {

    SpringTemplateEngine springTemplateEngine;

    @Autowired
    public PDFService(SpringTemplateEngine springTemplateEngine) {
        this.springTemplateEngine = springTemplateEngine;
    }

    public String savePDF(Bill bill) throws IOException, DocumentException {
        Context context = createContext(bill);

        var filename = new String(bill.getId() +  ".pdf");
        var filepath = new String("src/main/resources/pdf-files//" + filename);

        var htmlContent = springTemplateEngine.process("car-bill-template", context);
        var xHtmlContent = Converter.htmlToXHtml(htmlContent);

        Converter.htmlToPDF(xHtmlContent, "", filepath, PDFInfo.getDefaultPDFInfo(bill));

        return filepath;
    }

    private static Context createContext(Bill bill) {
        var context = new Context();

        context.setVariable("firstName",bill.getCustomer().getFirstname());
        context.setVariable("id",bill.getCustomer().getId());

        return context;
    }
}