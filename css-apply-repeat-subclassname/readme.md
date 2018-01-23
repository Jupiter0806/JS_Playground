If we have html tag like this

```html
<div class='container'> 
    <div class='item'> 
        item 1
        <div class='container'>
            <div class='item'> 
                item 1.1
                <div class='item'>
                    item 1.1.1
                </div>
            </div>
            <div class='item'> 
                item 1.2
            </div>  
        </div>
    </div>
    <div class='item'> 
        item 2
    </div>
    <div class='item'> 
        item 3
    </div>    
</div>
```

and css

```css
.container .item {
    background: red
}

.container>.item {
    background: green
}

.container .item:last-child {
    background: blue
}
```

then which will be selected for these css selectors