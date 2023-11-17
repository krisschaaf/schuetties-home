package krisschaaf.schuettieshome.bill.utils;

import org.w3c.tidy.Tidy;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

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

    public static String dateToString(Date date) {
        Locale locale = new Locale("de", "DE");
        DateFormat dateFormat = DateFormat.getDateInstance(DateFormat.DEFAULT, locale);

        return dateFormat.format(date);
    }
}
