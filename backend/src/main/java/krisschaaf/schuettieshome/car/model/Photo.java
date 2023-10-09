package krisschaaf.schuettieshome.car.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
