const customers = [
    {
        "firstName": "Wilson",
        "lastName": "Chinedu",
        "profilePic": "https://images.unsplash.com/photo-1520975829288-0493fb89e574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fGJsYWNrJTIwcHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "balance": "N547657",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "081234456777",
        "transactionHistory": [],
        "depositPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N1200",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N43100",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N16000",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "withdrawalPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "cardNumber": "645673" 
    },
    {
        "firstName": "John",
        "lastName": "Doe",
        "profilePic": "images/img2",
        "balance": "N645778",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "09012346281",
        "transactionHistory": [],
        "depositPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "withdrawalPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "cardNumber": "346896" 
    },
    {
        "firstName": "Jane",
        "lastName": "Doe",
        "profilePic": "images/img3",
        "balance": "N64342",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "070134528523",
        "transactionHistory": [],
        "depositPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "withdrawalPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "cardNumber": "678903" 
    },
    {
        "firstName": "Miracle",
        "lastName": "Walters",
        "profilePic": "images/img4",
        "balance": "N21357",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "09053467257",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "435678" 
    },
    {
        "firstName": "David",
        "lastName": "Joa",
        "profilePic": "images/img5",
        "balance": "N56700",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "08134568765",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "232345" 
    },
    {
        "firstName": "Shaun",
        "lastName": "Kay",
        "profilePic": "images/img6",
        "balance": "N90800",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "07098764321",
        "transactionHistory": [],
        "depositPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "withdrawalPending": [],
        "cardNumber": "456721" 
    },
    {
        "firstName": "Joe",
        "lastName": "Joyce",
        "profilePic": "images/img7",
        "balance": "N31400",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "443234" 
    },
    {
        "firstName": "Michael",
        "lastName": "Peters",
        "profilePic": "images/img8",
        "balance": "N32800",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "08043216784",
        "transactionHistory": [],
        depositPending: [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "withdrawalPending": [],
        "cardNumber": "981153" 
    },
    {
        "firstName": "Jacob",
        "lastName": "Zuma",
        "profilePic": "images/img9",
        "balance": "N120000",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "09012345678",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "067123" 
    },
    {
        "firstName": "Raymond",
        "lastName": "Uqwais",
        "profilePic": "images/img1",
        "balance": "N98753",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "0705543217",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "784554" 
    },
    {
        "firstName": "Michael",
        "lastName": "Peters",
        "profilePic": "images/img2",
        "balance": "N34590",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "08043216784",
        "transactionHistory": [],
        "depositPending": [
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
            {
                "amount": "N3400",
                "date": "12/03/2022",
                "time": "12:00",
                "agent": "John Ray",
                "id": '5645527452'
            },
        ],
        "withdrawalPending": [],
        "cardNumber": "982353" 
    },
    {
        "firstName": "Jacob",
        "lastName": "Zuma",
        "profilePic": "images/img3",
        "balance": "N12300",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "09012345678",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "062323" 
    },
    {
        "firstName": "Raymond",
        "lastName": "Uqwais",
        "profilePic": "images/img4",
        "balance": "N45000",
        "gender": "Male",
        "stateOfResidence": "Port Harcourt",
        "address": "Number 5 Opposie Lord's hosen Church Alakahia Junction Choba",
        "phoneNumber": "0705543217",
        "transactionHistory": [],
        "depositPending": [],
        "withdrawalPending": [],
        "cardNumber": "789023" 
    },
];

export default customers;