from pydantic import BaseModel as PydanticBaseModel, model_validator
from typing import Dict, Any, List

from app.models_shared.enums import RequestStatus

class BaseModel(PydanticBaseModel):

    @model_validator(mode='before')
    @classmethod
    def empty_str_to_none(cls, data: Dict[str, Any]) -> Dict[str, Any]:
        for key, value in data.items():
            if isinstance(value, str) and value == "":
                data[key] = None
        return data

class ResponseStatus(BaseModel):
    status: None | RequestStatus = None
    message: None | str = None
