const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '2d',
        issuer: 'https://hackon.es',
        algorithms: ["HS256"],
        ignoreExpiration: true
      };
      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } catch (err) {
        result = {
          error: err.Error,
          status: 401
        };
        res.status(401).send(result);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  },
  validateAdminToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: '2d',
        issuer: 'https://hackon.es',
        algorithms: ["HS256"],
        ignoreExpiration: true
      };
      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        if (!result.permissions.includes('user:admin')) {
          result = {
            error: 'Error: User is missing [user:admin] privilege',
            status: 401
          };
          res.status(401).send(result);
        } else {
          req.decoded = result;
          next();
        }
      } catch (err) {
        result = {
          error: err.Error,
          status: 401
        };
        res.status(401).send(result);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};