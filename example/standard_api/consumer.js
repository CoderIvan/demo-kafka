/* eslint-disable no-console */

const Kafka = require('node-rdkafka')

const consumer = new Kafka.KafkaConsumer({
	'group.id': 'kafka',
	'metadata.broker.list': 'localhost:9092',
})

consumer.connect()

consumer
	.on('ready', () => {
		console.log('Consumer is ready')

		consumer.subscribe(['test-topic'])
		setInterval(() => {
			consumer.consume(1)
		}, 1000)
	})
	.on('data', (data) => {
		console.log('Message found!  Contents below.', data)
	})
