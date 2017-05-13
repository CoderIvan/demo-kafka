const Kafka = require('node-rdkafka')

const producer = new Kafka.Producer({
	'metadata.broker.list': 'localhost:9092',
})

const writeStream = producer.getWriteStream('test-topic')

writeStream.write(new Buffer('Awesome message'))
