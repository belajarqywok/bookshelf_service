const logging = async (request) => {
    let traffic = request.traffic()

    console.log(
      `route=${request.route.path} ` +
      `recv=${traffic.recvPayload}/${traffic.recvRaw} ` +
      `sent=${traffic.sentPayload}/${traffic.sentRaw} ` +
      `start=${new Date(traffic.timeStart)} ` +
      `finish=${new Date(traffic.timeFinish)} ` +
      `duration=${traffic.timeDuration}ms`
    )
}

module.exports = logging