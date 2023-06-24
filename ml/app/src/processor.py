import os

from .utils import DataSample, DataInputSample, str_to_date, group_task, calc_dif_date

import pandas as pd
from dataclasses import asdict
from catboost import CatBoostRegressor


class Processor:

    def __init__(self, data_proc, MODEL_CATBOOST_PATH):
        self.data_proc = data_proc
        self.cb_reg = CatBoostRegressor()
        self.cb_reg.load_model(MODEL_CATBOOST_PATH)

    def preprocess(self, sample: DataSample):
        id_ = 1
        obj_prg = sample.obj_prg
        task_id = group_task(sample.task_id)
        late_start = calc_dif_date(str_to_date(sample.real_start_date),
                                   str_to_date(sample.plan_start_date))
        frame = pd.DataFrame(asdict(DataInputSample(task_id=task_id, late_start=late_start, target=0,
                                                    obj_prg=obj_prg, id=id_)), index=[0])
        frame = frame[['task_id', 'late_start', 'target', 'obj_prg', 'id']]
        return frame

    def predict(self, sample):
        input_ = self.preprocess(sample)
        transformed = self.data_proc.preprocess(input_, train=False, add_pca_feats=True,
                                                one_hot_encode=True)
        return self.cb_reg.predict(transformed)
