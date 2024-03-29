import logging
import os

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

from . import src


app = FastAPI()

MODEL_FIT_TRANSFORM_PATH = 'models/fit_transform.csv'
MODEL_CATBOOST_PATH = 'models/predictor'

fit_transform = pd.read_csv(MODEL_FIT_TRANSFORM_PATH, index_col=0, dtype={'task_id': 'str'})
data_proc = src.data_processor.DataProcessor()
X = data_proc.preprocess(fit_transform, add_pca_feats=True, one_hot_encode=True)

pr = src.processor.Processor(data_proc, MODEL_CATBOOST_PATH)


class Item(BaseModel):
    obj_prg: str
    task_id: str
    percent_ready: float
    plan_start_date: str
    plan_end_date: str
    real_start_date: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
def read_item(item: Item):
    sample = src.utils.DataSample(obj_prg=item.obj_prg,
                              task_id=item.task_id,
                              percent_ready=item.percent_ready,
                              plan_start_date=item.plan_start_date,
                              plan_end_date=item.plan_end_date,
                              real_start_date=item.real_start_date)
    predict = pr.predict(sample)[0]
    logging.info(f'Predict ready with ofset {predict}')
    return {'late_days': int(predict)}
