const join = require('./join')

function add(firebase, args) {
   var original = Object.assign({}, args)
   var keys = []
   var found = false
   Object.keys(args).forEach(key => {
       if (key === 'node' || found) {
           found = true
           return
       }
       keys.push(key)
       delete args[key]
   })

   return functions.create(firebase, args).
          then(node => join(firebase, { [keys[0]]: original[keys[0]], [args.node]: node._id }))
}

module.exports = add
