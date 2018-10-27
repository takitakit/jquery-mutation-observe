# jquery-mutation-observe

It is a useful jquery plugin based on MutationObserver.

When you apply a plug-in to an element, you can detect changes in the element itself or its descendant elements in real time.
Changes it can detect include changing attribute values and adding and deleting nodes.

## usage

### include jquery and this plugin

```
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="jquery-mutation-observe.js"></script>
```

### apply plugin to an element

#### monitoring changes of attributes

```
$('.element')
    // When monitoring only its own class attribute
    .observeAttribute({
        'attributes': 'class',
        'callback': function(data){
            console.log('attribute:class has been changed');
        }
    });
```

#### monitoring adding and deleting nodes

```
$('.element')
    .observeNode({
        'selector': '> .child',
        'callback': function(data) {
            var tag = escapeHtml($(data.node).prop('outerHTML'));
            if (data.type=='add') {
                console.log('node has been added');
            } else if (data.type=='remove') {
                console.log('node has been removed');
            }
        }
    });
```

## options

### .observeAttribute

| options    | type         | description                                                                                                                                                      | example  |
|------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| attributes | string/Array | Attribute list to be monitored. If not specified, all attributes are targeted.                                                                                   | "class"  |
| selector   | string       | selector character string specifying the element to be monitored.  (relative designation from the top element) If not specify, only the top element is targeted. | > .child |
| callback   | function     | Function to be called when a change is detected.                                                                                                                 |          |

### .observeNode

| options  | type     | description                                                                                                                                                                       | example  |
|----------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| selector | string   | Elements matching the selector are detected when adding or deleting. (relative designation from the top element) If not specify, all elements under the top element are targeted. | > .child |
| callback | function | Function to be called when a change is detected.                                                                                                                                  |          |

