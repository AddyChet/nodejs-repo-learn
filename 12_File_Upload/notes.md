timestamps in schema means mongoose will automatically add createdAt and updatedAt

$or is used to perform logical OR operations 
    const users = await User.find({
    age: { $or : [{username}, {email}] } 
    )}
$and operator
    const users = await User.find({
    age: { $and : [{username}, {email}] }
    )}
$not operator
    const users = await User.find({
    age: { $not : [{username}, {email}] }
    )}


bcrypt -- what it does?
    $[algorithm]$[cost]$[salt][hash]


    $2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
    |  |   |                      |
    |  |   |                      hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
    |  |   |
    |  |   salt = nOUIs5kJ7naTuTFkBy1veu
    |  |
    |  cost-factor => 10 = 2^10 rounds
    |
    hash-algorithm identifier => 2b = BCrypt
        
COST ---- 2^10 rounds. A higher cost factor means more iterations, resulting in a longer and more secure hashing process. Number of rounds or iterations the algorithm goes through to process the data.

SALT --- 16-byte (128-bit) salt, which is unique to each hashed password. Salting adds randomness to the hashing process. Even if two users have same password, the hash will be different for both of them.


