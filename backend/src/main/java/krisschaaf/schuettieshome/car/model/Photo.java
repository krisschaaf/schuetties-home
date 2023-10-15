package krisschaaf.schuettieshome.car.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;

@Document
@Data
public class Photo {

    public Photo(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    @Id
    private String id;

    private String name;

    private String type;

    private byte[] data;

    public String getEncodedData() {
        return Base64.getEncoder().encodeToString(this.getData());
    }
}
