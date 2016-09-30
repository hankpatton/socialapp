import jwt from 'koa-jwt'

const authCheck = jwt({
  secret: new Buffer('vbGCy2AWj9lWytHlrBjQhPzmkipfQf3bt8pCJ3szQTOCeeqyGrJxkmw4mesbkg5p', 'base64'),
  audience: 'qrhOvu54WpqnUPiuhYyQsSlYrzSds7Oa'
})

export default authCheck
