const Kafka = require('node-rdkafka')

const consumer = new Kafka.KafkaConsumer({
	'group.id': 'kafka',
	'metadata.broker.list': 'localhost:9092',
	rebalance_cb(event) {
		const assignment = event.assignment

		if (event.code === Kafka.CODES.REBALANCE.PARTITION_ASSIGNMENT) {
			this.assign(assignment)
		} else {
			this.unassign()
		}
	},
})

// Non-flowing mode
const readStream = consumer.getReadStream('test-topic')

readStream.on('data', (data) => {
	console.log('Message found!  Contents below.', data)
})
