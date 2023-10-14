package krisschaaf.schuettieshome.bill.model;

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
        return this.getDateString(this.car.getDate());
    }

    public String getEndDateAsString() {
        return this.getDateString(this.endDate);
    }

    private static String getDateString(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        var month = String.valueOf(calendar.get(Calendar.MONTH) + 1); //month method is indexed → january returns 0
        return String.valueOf(calendar.get(Calendar.DAY_OF_MONTH)) + '.' + month + '.' + calendar.get(Calendar.YEAR);
    }
}
