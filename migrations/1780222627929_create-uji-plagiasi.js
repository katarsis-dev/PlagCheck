/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("uji_plagiasi", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")
        },
        user_id: {
            type: 'uuid',
            references: '"users"',
            onDelete: "CASCADE"
        },
        docs1: {
            type: "text",
            notNull: true,
        },
        docs2: {
            type: "text",
            notNull: true,
        },
        result: {
            type: "INTEGER",
            notNull: true,
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("uji-plagiasi")

};
