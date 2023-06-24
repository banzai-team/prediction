from dataclasses import dataclass

from typing import Union
from datetime import datetime
from datetime import date


@dataclass
class DataSample:
    """Class for keeping one sample of data"""
    obj_prg: str
    task_id: str
    percent_ready: float
    plan_start_date: str
    plan_end_date: str
    real_start_date: str


@dataclass
class DataInputSample:
    """Class for keeping one sample of data"""
    id: int
    plan_during: int
    obj_prg: str
    task_id: str
    target: int
    late_start: int


def str_to_date(date_str: Union[str, None]) -> Union[date, None]:
    """
    input data format: %Y-%m-%d
    """
    if isinstance(date_str, str):
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    else:
        return None


def calc_dif_date(date1: date, date2: date) -> Union[int, None]:
    """
    calculate difference between two dates
    """
    if isinstance(date1, date) and isinstance(date2, date):
        return (date2 - date1).days
    else:
        return None


def group_task(item):
    parts = str(item).split('.')
    return '.'.join(parts[:2])

