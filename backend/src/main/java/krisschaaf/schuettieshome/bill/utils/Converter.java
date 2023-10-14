package krisschaaf.schuettieshome.bill.utils;

import com.itextpdf.html2pdf.HtmlConverter;
import org.w3c.tidy.Tidy;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.Date;

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

    //TODO add pdf metadata (https://itextpdf.com/sites/default/files/2018-10/pdfHTML-whitepaper-FINAL.pdf)
    public static void htmlToPDF(String htmlString, String filepath, PDFInfo pdfInfo) {
        try {
            HtmlConverter.convertToPdf(htmlString, new FileOutputStream(filepath));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String dateToString(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        var month = String.valueOf(calendar.get(Calendar.MONTH) + 1); //month method is indexed → january returns 0
        return String.valueOf(calendar.get(Calendar.DAY_OF_MONTH)) + '.' + month + '.' + calendar.get(Calendar.YEAR);

    }
}
