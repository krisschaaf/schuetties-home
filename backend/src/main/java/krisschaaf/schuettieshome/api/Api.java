package krisschaaf.schuettieshome.api;

public interface Api {
    String VERSION = "/api/v1";
    String CUSTOMER_PATH = VERSION + "/customers/customer";
    String CAR_PATH = VERSION + "/cars/car";
    String PHOTO_PATH = VERSION + "/cars/photo";
    String BILL_PATH = VERSION + "/bills/bill";

//    String PERMISSION_READ_CUSTOMERS = "SCOPE_read:customers";
//    String PERMISSION_WRITE_CUSTOMERS = "SCOPE_write:customers";
}