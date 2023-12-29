import { createPool } from 'mysql2/promise';
import {configDBPr} from '../inc/configService.js';

// тупо настроки подключения к БД и все 
export const pool = createPool(configDBPr);
