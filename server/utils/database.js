import { createPool } from 'mysql2/promise';
import {configDBPanel, configDBProfitools, configDBMotoservice, configDBProrab} from '../inc/configService.js';

// тупо настроки подключения к БД и все 
export const poolDBPanel =  createPool(configDBPanel);

export const poolDBProfitools =  createPool(configDBProfitools);

export const poolDBMotoservice =  createPool(configDBMotoservice);

export const poolDBProrab = createPool(configDBProrab);

