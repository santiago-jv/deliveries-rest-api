# Deliveries REST API made with Express

This is a refactorization of the first proyect made with Java-Spring boot.

## Endpoints

### Admin


|Endpoint| Method 
|---|---|
|  api/auth/login|POST
| api/auth/register  | POST  |  

### Messengers
|Endpoint| Method 
|---|---|
|  api/messengers?offset=0&limit=10|GET
| api/messengers/:id  | GET  |  
| api/messengers/:id  | POST  |  
| api/messengers/:id  | PUT  |  
| api/messengers/:id  | DELETE  |  

### Deliveries
|Endpoint| Method 
|---|---|
|  api/deliveries?offset=0&limit=10|GET
| api/deliveries/:id  | GET  |  
| api/deliveries?messenger=:messengerId  | POST  |  
| api/deliveries/:id  | PUT  |  
| api/deliveries/:id  | DELETE  |  



## Request body for each endpoint 

### Admin

 -  api/auth/login


```
{
	"email":"example@ex.com",
	"password":"somepassword"
}
```

-  api/auth/register

```
{
	"name":"Santiago Olayo"
	"email":"example@ex.com",
	"password":"somepassword"
}
```
**NOTE: THE FOLLOWING ENDPOINTS REQUIRE A BEARER TOKEN TO ACCESS. BE SURE TO SEND THE TOKEN IN THE AUTHORIZATION HEADER**

### Messengers

 -  api/messengers (POST)
```
{
	"name":"someone",
	"address":"some address",
	"gender":"M"| "F",
	"identificationNumber":"123112312312",
	"numberCell":"3006153722",
	"motorcyclePlate":"KSF-234"
	
}
```
 -  api/messengers/:id (PUT)
```
{
	"name":"someone",
	"address":"some address",
	"gender":"M"| "F",
	"identificationNumber":"123112312312",
	"numberCell":"3006153722",
	"motorcyclePlate":"KSF-234"
	
}
```
### Deliveries

 -  api/deliveries?messenger=:messengerId (POST)
```
{
	"description":"some description for delivery",
	"address":"some address",
	"pickUpTime":"12:00",
	"deliveryTime":"09:00",
	"motorcyclePlate":"KSF-234",
	"petitioner":{
		"name":"petitioner name",
		"address":"some address",
		"numberCell":"3002124422"
	},
	"receiver":{
		"name":"receiver name",
		"address":"some address",
		"numberCell":"3002124422"
	}
}


```
 -  api/deliveries/:id (PUT)
```
{
	"description":"some description for delivery updated",
	"address":"some address updated",
	"pickUpTime":"12:00",
	"deliveryTime":"09:00",
	"motorcyclePlate":"KSF-234",
	"petitioner":{
		"name":"petitioner name updated",
		"address":"some address updated",
		"numberCell":"3002124422"
	},
	"receiver":{
		"name":"receiver name updated",
		"address":"some address updated",
		"numberCell":"3002124422"
	}
}
```

