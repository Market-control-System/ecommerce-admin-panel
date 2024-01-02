import { createPool } from 'mysql2/promise';
import {configDBPanel} from '../inc/configService.js';

// тупо настроки подключения к БД и все 
export const pool =  createPool(configDBPanel);

