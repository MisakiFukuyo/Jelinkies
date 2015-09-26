var Jelinkies = function(linkObjective,captureMethod,insertMethod){
  this.onSignaledActions = [];
  if(captureMethod == undefined && insertMethod == undefined){
    this.linkObjective = linkObjective;
    var self = this;
    this.linkedValue = function(val){
      if(val == undefined){
        return self.linkObjective;
      }else{
        self.linkObjective = val;
        for (var i=0;i<self.onSignaledActions.length;i++) {
          self.onSignaledActions[i](self.linkObjective);
        }
      }
    }
  }else{
    this.captureMethod = captureMethod;
    this.insertMethod = insertMethod;
    var self = this;
    this.linkedValue = function(val){
      if(val == undefined){
        return self.captureMethod(linkObjective);
      }else{
        insertMethod(linkObjective,val);
        for (var i=0;i<self.onSignaledActions.length;i++) {
          self.onSignaledActions[i](self.captureMethod(linkObjective));
        }
      }
    }
  }
};

var JelinkiesDual = function(a,b){
  this.dualLinking = false;
  var self = this;
  this.aAct = function(val){
    if(!self.dualLinking){
      self.dualLinking = true;
      b.linkedValue(val);
    } else {
      self.dualLinking = false;
    }
  };

  this.bAct = function(val){
    if(!self.dualLinking){
      self.dualLinking = true
      a.linkedValue(val);
    } else {
      self.dualLinking = false;
    }
  };

  a.onSignaledActions.push(this.aAct);
  b.onSignaledActions.push(this.bAct);
};
