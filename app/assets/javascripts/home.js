$(document).ready(function() {
	var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/';

	function productCard(product) {
		$.ajax({
			url: '/product_card',
			type: 'GET',
			data: {product: product},
			success: function(data) {
				$('#products').append(data);
			},
			error: function(data) {
				console.log(data);
			}
		});
	}

	function getProducts() {
		$('#products').empty();
		$.ajax({
			url: baseUrl + 'products',
			type: 'GET',
			success: function(data) {
				var products = data.products;
				for(var i = 0; i < products.length; i++) {
					var product = products[i];
					productCard(product);
				}
			},
			error: function(data) {
				console.log(data);
			}
		});
	}

	getProducts();

	$(document).on('click', '.edit_product', function(e) {
		e.preventDefault();
		var editForm = $('#product_edit_form');

		$.ajax({
			type: 'GET',
			url: baseUrl + 'products/' + $(this).data('product-id'),
			success: function(data) {
				var product = data.product;
				editForm.find('#product_name').val(product.name);
				editForm.find('#product_base_price');
				editForm.find('#product_description');
				editForm.find('#product_quantity_on_hand');
				editForm.find('#product_color');
				editForm.find('#product_weight');
				editForm.find('#product_other_attributes');

				$('body').scrollTop(0);
				editForm.removeClass('hide');
			},
			error: function(data) {
				console.log(data);
			}
		});
	});

	$('#product_edit_form').submit(function(e) {
		e.preventDefault();
		var name = $(this).find('#product_name').val();
		var basePrice = $(this).find('#product_base_price').val();
		var description = $(this).find('#product_description').val();
		var quantityOnHand = $(this).find('#product_quantity_on_hand').val();
		var color = $(this).find('#product_color').val();
		var weight = $(this).find('#product_weight').val();
		var otherAttributes = $(this).find('#product_other_attributes').val();

		$.ajax({
			url: baseUrl + 'products/' + productId,
			type: 'PUT',
			data: {product: {name: name,
											 base_price: basePrice,
											 description: description,
											 quantity_on_hand: quantityOnHand,
											 color: color,
											 weight: weight,
											 other_attributes: otherAttributes}},
		  success: function(data) {
		  	getProducts();
		  },
		  error: function(data) {
		  	console.log(data);
		  }
		});
	});

	$(document).on('click', '.show_product', function(e) {
		e.preventDefault();
	});

	$(document).on('click', '.delete_product', function(e) {
		e.preventDefault();

		$.ajax({
			url: baseUrl + 'products/' + $(this).attr('href'),
			type: 'DELETE',
			success: function(data) {
				$('.alert').text(data.message).removeClass('hide');
				getProducts();
			},
			error: function(data) {
				console.log(data);
			},
		});
	});
































});