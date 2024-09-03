const getApproversAndRequesters= async (checker)=>{
    try {
      const selectedArray = checker.filter(input=>(input!==false));

      const approversArray=selectedArray.map(info=>({
            approverId:info,
            status:'Pending',
      }))
      return approversArray;

    } catch (error) {
      console.error("Error retrieving approvers and requesters:", error);
      throw error;
    }
}

const handleParallel=(userIds)=>{
  userIds.forEach(user=>{
      io.emit(`newRequest${user.approverId}`,user.approverId);
  })
};

const handleSequential=(userIds,docs)=>{
  console.log(docs.counter);
  if (docs.counter >= userIds.length) {
      console.log("All users have been notified");
      return;
  }
  const userId = userIds[docs.counter].approverId;
  io.emit(`sender${userId}`, userIds[docs.counter].approverId);
};


exports.services={
    getApproversAndRequesters,
    handleParallel,
    handleSequential,
}