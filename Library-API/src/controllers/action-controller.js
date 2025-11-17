const ApiError = require('../exceptions/api-error');
const pool = require('../db/connection-pool');

const ActionController = {
    getAll: async (req, res, next) => {
        try {
            const query = `
                SELECT a.id, a.timestamp, a.description,
                       at.name AS action_type,
                       u.username AS user
                FROM action a
                     INNER JOIN action_type at ON a.action_type_id = at.id
                     LEFT JOIN user u ON a.user_id = u.id
                ORDER BY a.timestamp DESC
            `;

            const [rows] = await pool.query(query);
            res.json(rows);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const query = `
                SELECT a.id, a.timestamp, a.description,
                       at.name AS action_type,
                       u.username AS user
                FROM action a
                     INNER JOIN action_type at ON a.action_type_id = at.id
                     LEFT JOIN user u ON a.user_id = u.id
                WHERE a.id = ?
            `;

            const [rows] = await pool.query(query, [id]);

            if (!rows.length) {
                return next(ApiError.NotFound('Action not found'));
            }

            res.status(200).json(rows[0]);
        } catch (e) {
            next(e);
        }
    }
};

module.exports = ActionController;
