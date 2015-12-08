var Jelinkies = function(linkObjective,captureMethod,insertMethod){
  this.onSignaledActions = [];
  if(captureMethod == undefined && insertMethod == undefined){
    this.linkObjective = linkObjective;
    var self = this;
    this.signaling = function(){
      for (var i=0;i<self.onSignaledActions.length;i++) {
        self.onSignaledActions[i](self.linkObjective);
      }
    }
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
    this.signaling = function(){
      for (var i=0;i<self.onSignaledActions.length;i++) {
        self.onSignaledActions[i](self.captureMethod(linkObjective));
      }
    }
    this.linkedValue = function(val){
      if(val == undefined){
        return self.captureMethod(linkObjective);
      }else{
        self.insertMethod(linkObjective,val);
        for (var i=0;i<self.onSignaledActions.length;i++) {
          self.onSignaledActions[i](self.captureMethod(linkObjective));
        }
      }
    }
    this.indexedLinkedValue = function(i,val){
      if(i == undefined && val == undefined){
        return;
      }else if(val == undefined){
        return self.captureMethod(linkObjective,i);
      }else{
        self.insertMethod(linkObjective,val,i);
        for (var i=0;i<self.onSignaledActions.length;i++) {
          self.onSignaledActions[i](self.captureMethod(linkObjective,i),i);
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
