/**
 * Created with IntelliJ IDEA.
 * User: smeshkov
 * Date: 10/1/13
 * Time: 11:01 AM
 * To change this template use File | Settings | File Templates.
 */
window.ccarousel = function(window, undefined) {

    var _o = {
        currentIndex: 0,
        transNormChildCss: 'cct-norm-child',
        transUpCss: 'cct-up',
        transUpChildCss: 'cct-up-child',
        transDownCss: 'cct-down',
        transDownChildCss: 'cct-down-child',
        rootCss: 'ccarousel',
        listCss: 'ccarousel-list',
        itemCss: 'ccarousel-item',
        zkObjId: 'ccZkObjIndex',
        duration: 600,
        angle: 60,
        no3dMargin : 60,
        transition: 'all linear 0.5s',
        transformStyle: 'preserve-3d',
        toServer: true
    }

    var _tNormChild, _tUp, _tUpChild,  _tDown, _tDownChild,
        _listHeight, _centerItemHeight;

    function _init(options) {
        if(options) {
            for(var key in options) {
                if(_o[key]) {
                    _o[key] = options[key];
                }
            }
        }

        _tNormChild = {
            'transform':'none',
            '-moz-transform':'none',
            '-webkit-transform':'none',
            'transition': _o.transition,
            '-moz-transition': _o.transition,
            '-webkit-transition': _o.transition,
            'background': '#e5e5e5'
        }
        _tUp = {
            'transform-style': _o.transformStyle,
            '-moz-transform-style': _o.transformStyle,
            '-webkit-transform-style': _o.transformStyle,
            'perspective': '800px',
            '-moz-perspective': '800px',
            '-webkit-perspective': '800px'
        }
        _tUpChild = {
            'transform':'rotate3d(1, 0, 0, -' + _o.angle + 'deg)',
            '-moz-transform':'rotate3d(1, 0, 0, -' + _o.angle + 'deg)',
            '-webkit-transform':'rotate3d(1, 0, 0, -' + _o.angle + 'deg)',
            'transition': _o.transition,
            '-moz-transition': _o.transition,
            '-webkit-transition': _o.transition,
            'background': '#e5e5e5',
            'background': '-moz-linear-gradient(top,  #e5e5e5 0%, #adadad 100%)',
            'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e5e5e5), color-stop(100%,#adadad))',
            'background': '-webkit-linear-gradient(top,  #e5e5e5 0%,#adadad 100%)',
            'background': '-o-linear-gradient(top,  #e5e5e5 0%,#adadad 100%)',
            'background': '-ms-linear-gradient(top,  #e5e5e5 0%,#adadad 100%)',
            'background': 'linear-gradient(to bottom,  #e5e5e5 0%,#adadad 100%)',
            'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#e5e5e5", endColorstr="#adadad",GradientType=0 )'
        }
        _tDown = {
            'transform-style': _o.transformStyle,
            '-moz-transform-style': _o.transformStyle,
            '-webkit-transform-style': _o.transformStyle,
            'perspective': '800px',
            '-moz-perspective': '800px',
            '-webkit-perspective': '800px'
        }
        _tDownChild = {
            'transform':'rotate3d(1, 0, 0, ' + _o.angle + 'deg)',
            '-moz-transform':'rotate3d(1, 0, 0, ' + _o.angle + 'deg)',
            '-webkit-transform':'rotate3d(1, 0, 0, ' + _o.angle + 'deg)',
            'transition': _o.transition,
            '-moz-transition': _o.transition,
            '-webkit-transition': _o.transition,
            'background': '#e5e5e5',
            'background': '-moz-linear-gradient(top,  #e5e5e5 0%, #adadad 100%)',
            'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e5e5e5), color-stop(100%,#adadad))',
            'background': '-webkit-linear-gradient(top,  #e5e5e5 0%,#adadad 100%)',
            'background': '-o-linear-gradient(top,  #e5e5e5 0%,#adadad 100%)',
            'background': '-ms-linear-gradient(top,  #e5e5e5 0%,#adadad 100%)',
            'background': 'linear-gradient(to bottom,  #e5e5e5 0%,#adadad 100%)',
            'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#e5e5e5", endColorstr="#adadad",GradientType=0 )'
        }

    }

    function _build() {
        $('.'+_o.rootCss).css({
            'position': 'fixed',
            'top': '0',
            'height': '100%'
        });

        $('.'+_o.listCss).css({
            'position': 'relative',
            'transition': _o.transition,
            '-moz-transition': _o.transition,
            '-webkit-transition': _o.transition
        });

        var item = $('.'+_o.itemCss+':eq(0)');
        _centerItemHeight = item.height() + (parseInt(item.css('margin-top')) + parseInt(item.css('margin-bottom')));
        _listHeight = $('.'+_o.rootCss).height();

        $('.'+_o.listCss).css('margin-top', _calcMarginTop(0)+'px');
        _refresh();
    }

    function _scroll(toIndex, refresh, hidden) {
        if(hidden === true) {
            _tUpChild = _merge_options(_tUpChild,{'opacity': '1'})
            _tNormChild = _merge_options(_tNormChild,{'opacity': '0'})
            _tDownChild = _merge_options(_tDownChild,{'opacity': '1'})
        }
        // Transform
        if (Modernizr && Modernizr.csstransforms3d) {
            $('.'+_o.itemCss+':lt('+toIndex+')').css(_tUp);
            $('.'+_o.itemCss+':lt('+toIndex+') > div').css(_tUpChild);
            $('.' + _o.itemCss + ':eq(' + toIndex + ') > div').css(_tNormChild);
            $('.'+_o.itemCss+':gt('+toIndex+')' ).css(_tDown);
            $('.'+_o.itemCss+':gt('+toIndex+') > div' ).css(_tDownChild);
        } else {
            $('.'+_o.itemCss).addClass('no-3d').css({marginBottom: _o.no3dMargin + 'px'});
        }

        $('.'+_o.listCss).css('margin-top', _calcMarginTop(toIndex)+'px');

        if(_o.toServer === true) { _sendToServer(toIndex); }
        _o.currentIndex = toIndex;
        if(refresh) { _refresh(); }
    }

    function _refresh() {


        $('.'+_o.itemCss).each( function (index, el) {

            $(this).click( function (evt) {  _scroll( index )} );
        } );
    }

    function _sendToServer(toIndex) {
        zAu.send( new zk.Event( zk.Widget.$( '$'+_o.zkObjId ), "onChange", {value: toIndex}, {toServer: true} ) );
    }

    function _calcMarginTop(toIndex) {
        var rotatedItemsHeight = 0, scale = 1;
        $('.'+_o.itemCss+':lt('+toIndex+')').each(function(index, el){
            var item = $(this);

            var itemHeight = Math.round(item.height() * scale) + (parseInt(item.css('margin-top')) + parseInt(item.css('margin-bottom')));
            rotatedItemsHeight += itemHeight;

            if (parseInt(item.css('margin-bottom')) == 0 && Modernizr  && !Modernizr.csstransforms3d) {
                rotatedItemsHeight += _o.no3dMargin;
            }
        });


        return Math.round(_listHeight/2 - ( _centerItemHeight/2 + rotatedItemsHeight));
    }

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function _merge_options(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    return {
        init: _init,

        build: _build,

        scroll: _scroll,

        refresh: _refresh
    }

}(window);

$( document ).ready( function () {

    window.ccarousel.init();
    window.ccarousel.build();
    window.ccarousel.scroll(0, true);

} );
