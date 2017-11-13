
var state = {
	items:[]
};

function createShoppingList(){
	$('#js-shopping-list-form').submit(function(event){
		event.preventDefault();
		var userInputText = $(this).find('#shopping-list-entry');
		addItem(state, userInputText.val());
		renderList(state, $('.shopping-list'));
		userInputText.val("");
	});
}
var addItem = function(state,item){
	state.items.push({
		displayName:item,
		checkedOff:false
	});
}
var renderList = function(state, element){
	var itemHTML = state.items.map(function(item,index){
		if(!item.checkedOff){
			return '<li data-list-item-id='+ index +'><span class="shopping-item">'+ item.displayName +'</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
		}else{
			return '<li data-list-item-id='+ index +'><span class="shopping-item shopping-item__checked ">'+ item.displayName +'</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
	}
});
	return element.html(itemHTML);
}


function getItem(state, itemIndex) {
  return state.items[itemIndex];
}

function updateItem(state, itemIndex, newItem){

	state.items[itemIndex]= newItem;

}

function deleteItem(state,itemIndex){
	state.items.splice(itemIndex, 1);

}

$('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
	var itemId = $(this.closest('li')).attr('data-list-item-id');
	var oldItem = getItem(state,itemId);
	
	updateItem(state, itemId, {
		displayName:oldItem.displayName,
		checkedOff:!oldItem.checkedOff
	});
    renderList(state, $('.shopping-list'));
  });

$('.shopping-list').on('click', '.shopping-item-delete', function(event) {
	var itemId = $(this.closest('li')).attr('data-list-item-id');
	var oldItem = getItem(state,itemId);
	
	deleteItem(state, itemId);
    renderList(state, $('.shopping-list'));
  });

$(function(){
	createShoppingList();
});

