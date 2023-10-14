package krisschaaf.schuettieshome.bill.model;

import krisschaaf.schuettieshome.bill.utils.Converter;
import krisschaaf.schuettieshome.car.model.Car;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Calendar;
import java.util.Date;

@Data
public class BilledCar {
    @DBRef
    private Car car;

    private Date endDate;

    public long getDateDifferenceInDays() {
        long timeDifferenceMillis = endDate.getTime() - car.getDate().getTime();

        var seconds = timeDifferenceMillis / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;

        return days;
    }

    public long getPricePerCar(long paymentPerMonth) {
        return (long) (paymentPerMonth / 30.42 * this.getDateDifferenceInDays());
    }

    public String getStartDateAsString() {
        return Converter.dateToString(this.car.getDate());
    }

    public String getEndDateAsString() {
        return Converter.dateToString(this.endDate);
    }
}
