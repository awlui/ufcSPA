angular.module('ufcApp')
	.directive('modalMaster', ['$uibModal', function ($uibModal) {
		return {
			restrict: 'E', 
			scope: {
				mediaList: '='
			},
			templateUrl: 'components/modal_master.html',
			controller: ['$scope', '$log', '$document', function($scope, $log, $document) {
				this.open = function(item) {
					var modalInstance = $uibModal.open({
						templateUrl: 'components/modal_instance.html',
						controller: ['$uibModalInstance', 'item', function($uibModalInstance, item) {
							var self = this;
							self.item = item;
							self.close = function() {
								$uibModalInstance.dismiss('cancel');
							}
						}],
						controllerAs: 'modalCtrl',
						resolve: {
							item: function() {
								return item;
							}
 						}

					});

					modalInstance.result.then(function (selectedItem) {
					  $ctrl.selected = selectedItem;
					}, function () {
					  $log.info('Modal dismissed at: ' + new Date());
});
				}
			}]
		}


	}]);
angular.module('ufcApp')
  .directive('modalButton', [function() {
  	return {
  		restrict: 'E',
  		require: '^modalMaster',
  		replace: true,
  		transclude: true,
  		template: '<button ng-click="open()" ng-transclude></button>',
  		scope: {
  			mediaItem: '='
  		},
  		link: function($scope, $elem, $attr, modalCtrl) {
 			$scope.open = function() {
  				modalCtrl.open($scope.mediaItem);
  			}
  		}

  	}
  }]);

// angular.module('ufcApp')
//   .controller('modalInstanceCtrl', ['$uibModalInstance',function($uibModalInstance) {
//   	var $ctrl = this;
//   	$ctrl.url = url;

//   }])
// .controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
//   var $ctrl = this;
//   $ctrl.items = items;
//   $ctrl.selected = {
//     item: $ctrl.items[0]
//   };

//   $ctrl.ok = function () {
//     $uibModalInstance.close($ctrl.selected.item);
//   };

//   $ctrl.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });

// angular.module('ufcApp')
//   .directive('modalInstance', ['$uibModalInstance', function($uibModalInstance) {
//   	return {
//   		restrict: 'E',
//   		templateUrl: 'components/modal_instance.html',
//   		scope: false,
//   		link: function($scope, $elem, $attr) {
//   			console.log('hi')
//   		}
//   	}
//   }])

// angular.module('ufcApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
//   var $ctrl = this;
//   $ctrl.items = items;
//   $ctrl.selected = {
//     item: $ctrl.items[0]
//   };

//   $ctrl.ok = function () {
//     $uibModalInstance.close($ctrl.selected.item);
//   };

//   $ctrl.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// });