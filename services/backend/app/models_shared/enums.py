from enum import Enum


class AccountType(str, Enum):
    ADVERTISING = "Advertising"
    MANUFACTURING = "Manufacturing"
    IT = "IT"
    PUBLIC_AFFAIRS = "Public Affairs"
    ENTERTAINMENT = "Entertainment"
    TRANSPORTATION = "Transportation"

class RequestStatus(str, Enum):
    SUCCESS = "success"
    ERROR = "error"
