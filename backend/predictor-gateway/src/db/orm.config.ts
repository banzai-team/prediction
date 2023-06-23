import { DataSource } from 'typeorm';

import { config } from '../config/configuration';

/**
 * Configuration for DB migrations.
 */
export default new DataSource(config().db);
