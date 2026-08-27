If you need a user to be authenticated, before they should be able to access an enpoint, 
1. import the authenticate function from the authMiddleware file, and import in the routes file you wish to use it in, then depending on wether you want to implement an ansync operation, u can use it in the folowing ways.
- async operation example
    router.get('/me', authenticate, async (req, res) => {...})
- non async example, 
    router.get('/me', authenticate, (req, res) => {...}) 

A user id can be gotton from req.user.id

In the server.js file no route should be bellow the errorHandler route