const verifyRoles = (...allowedRoles) => {
  return (request, response, next) => {
    if (!request?.roles) return response.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(request.roles);

    const result = request.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if(!result) return response.sendStatus(401);
    next();

  }
}

module.exports = verifyRoles