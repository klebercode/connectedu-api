db.auth('root', 'secret')
db = db.getSiblingDB('customer1')

db.createUser(
        {
            user: "admin",
            pwd: "senha123",
            roles: [
                {
                    role: "readWrite",
                    db: "customer1"
                }
            ]
        }
)

db = db.getSiblingDB('customer2')
db.createUser(
        {
            user: "admin",
            pwd: "senha123",
            roles: [
                {
                    role: "readWrite",
                    db: "customer2"
                }
            ]
        }
);

