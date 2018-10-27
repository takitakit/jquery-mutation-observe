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
