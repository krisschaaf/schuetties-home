package krisschaaf.schuettieshome.bill.utils;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import org.w3c.tidy.Tidy;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.UnsupportedEncodingException;

import static com.itextpdf.text.xml.xmp.XmpWriter.UTF8;

public class Converter {

    public static String htmlToXHtml(String html) throws UnsupportedEncodingException {
        var tidy = new Tidy();
        tidy.setInputEncoding("UTF-8");
        tidy.setOutputEncoding("UTF-8");
        tidy.setXHTML(true);

        var inputStream = new ByteArrayInputStream(html.getBytes("UTF-8"));
        var outputStream = new ByteArrayOutputStream();

        tidy.parseDOM(inputStream, outputStream);

        return outputStream.toString("UTF-8");
    }

    public static void htmlToPDF(String htmlString, String css, String filepath, PDFInfo pdfInfo) {
        try {
            var document = new Document(PageSize.A4);
            var pdfWriter = PdfWriter.getInstance(document, new FileOutputStream(filepath));

            document.open();

            if (pdfInfo != null) {
                document.addAuthor(pdfInfo.getAuthor());
                document.addCreator(pdfInfo.getCreator());
                document.addSubject(pdfInfo.getSubject());
                document.addTitle(pdfInfo.getTitle());
            }

            document.addCreationDate();

            var worker = XMLWorkerHelper.getInstance();
            var cssInput = new ByteArrayInputStream(css.getBytes(UTF8));
            var htmlInput = new ByteArrayInputStream(htmlString.getBytes(UTF8));

            worker.parseXHtml(pdfWriter, document, htmlInput, cssInput);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
