;(function(window,document,undefined){
	//tools
	Array.prototype.contains = function (ele) {
		for(var index in this){
			if(this[index] === ele){
				return true;
			}
		}
		return false;
	};

	window.SAL_cookie= {
		/**
		 * 创建cookie
		 * @param  {string} 	name         [cookie's name]
		 * @param  {any} 		value        [cookie's value]
		 * @param  {number} 	expiry_date  [cookie有效期(秒)]
		 */
		create : function(name,value,expiry_date){
			var expiry_date = expiry_date || 0 ; 
			var local_time  = new Date();
			var deadline;
			var self = this;
			if(typeof expiry_date === "number"){ 
				deadline = new Date(new Date().setTime( local_time.getTime() + expiry_date*1000 )).toGMTString();
			};
			/**
			 * decodeURIComponent() 解码
			 * encodeURIComponent() 编码
			 */
			document.cookie = name + "=" +  encodeURIComponent(value) + "; expires=" + deadline;
		},
		check : function (name){
			var arr_cookies = document.cookie.split(";");
			var arr_names = [];
			var arr_values = [];
			
			for(var i = 0 ; i < arr_cookies.length ;i++){
				
				arr_cookies[i] = arr_cookies[i].trim();

				var RE = /\=/g;
				RE.exec(arr_cookies[i]);

				arr_names[i] = arr_cookies[i].slice(0,RE.lastIndex-1);
				arr_values[i] = arr_cookies[i].slice(RE.lastIndex);
			};

			self.arr_cookies = arr_cookies;
			self.arr_names   = arr_names ;
			self.arr_values  = arr_values ;
			
			return arr_names.contains(name); 
		},
		delete : function (name){
			var self = this ;

			if(self.check(name)){
				document.cookie = name + "=; expires=" + new Date(0).toGMTString();
			}
		},
		read : function(name){
			var self = this ;

			if(self.check(name)){
				for(var index in arr_names){
					if(arr_names[index] === name){
						return decodeURIComponent(arr_values[index]);
					}
				}
			};
		}
	};
})(window,document);