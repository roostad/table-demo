from datetime import datetime

from app.models_shared.pydantic import BaseModel
from pydantic import EmailStr, Field

from app.models_shared.enums import AccountType


class AccountData(BaseModel):
    account: str = Field(min_length=7, max_length=7)
    account_type: AccountType
    account_rep: str
    account_rep_email: EmailStr
    account_rep_id: str = Field(min_length=10, max_length=10)
    accountant1: str
    accountant1_email: EmailStr
    accountant2: str | None
    accountant2_email: EmailStr | None
    accountant3: str | None
    accountant3_email: EmailStr | None
    account_updated_on: datetime
    account_updated_by: str
    account_added_on: datetime

