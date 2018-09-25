let text = "Nullam vel sem. Nullam vel sem. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Donec vitae sapien ut libero venenatis faucibus. ullam dictum feliseu pede mollis pretium. Pellentesque ut neque. ";

function getDate(date_string) {
    let d = new Date(date_string);
    return d
}

function preprocess(confs) {
    let data = [];
    for(let conf in confs) {
        let obj = Object(confs[conf]);
        obj.short_name = conf;
        data.push(obj);
    }
    data.sort((a, b) => getDate(b.date[0]) - getDate(a.date[0]));
    return data;
}

function fill_works(data) {
    let container = $('#timeline-container');
    let period = $('#timeline-period-template');
    let item = $('#timeline-item-template');
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let prev = -1;
    data.forEach(function(d) {
        let curr = getDate(d.dates[0]).getFullYear();
        if(curr != prev) {
            elem = period.contents().clone();
            elem.find('h2').text(curr);
            container.append(elem);
            prev = curr;
        }
        elem = item.contents().clone();
        elem.find('h3').text(d.name);
        elem.find('span:eq(0)').text(getDate(d.dates[0]).toLocaleDateString('en-US', options));
        elem.find('span:eq(1)').text(d.source);
        elem.find('p:eq(0)').text(d.title)
                            .attr('class', 'font-weight-bold auto-textbox-1');
        elem.find('p:eq(1)').text(d.authors.join(', '))
                            .attr('class', 'auto-textbox-1');
        elem.find('p:eq(2)').text(d.abstract)
                            .attr('class', 'auto-textbox-3');
        elem.find('a').text(d.url)
                      .attr('href', d.url)
                      .attr('target', '_blank')
                      .attr('class', 'auto-textbox-1');
        container.append(elem);
    });
    $('.timeline-content p').css('margin-bottom', '.5rem');
}

function fill_conferences(data) {
    let container = $('#timeline-container');
    let period = $('#timeline-period-template');
    let item = $('#timeline-item-template');
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let prev = -1;
    let elem = undefined;
    data.forEach(function(d) {
        let curr = getDate(d.date[0]).getFullYear();
        if(curr != prev) {
            elem = period.contents().clone();
            elem.find('h2').text(curr);
            container.append(elem);
            prev = curr;
        }
        elem = item.contents().clone();
        elem.find('h3').text(d.short_name);
        elem.find('span:eq(0)').text(getDate(d.date[0]).toLocaleDateString('en-US', options));
        elem.find('span:eq(1)').html(d.location);
        elem.find('p:eq(0)').html(d.name);
        elem.find('a').text(d.url)
                      .attr('href', d.url)
                      .attr('target', '_blank')
                      .attr('class', 'auto-textbox-1');
        container.append(elem);
    });
    $('.timeline-content p').css('margin-bottom', '0');
}

function load_contributors() {
    $.get('data/contributors.json', function(data) {
        let elem = $('#contributors');
        let first = true;
        let contributors = data;
        contributors.forEach(function(contrib) {
            let a = $('<a>').text(contrib.name)
                            .attr('href', contrib.url)
                            .attr('target', '_blank');
            if(!first) {
                elem.append(', ')
            }
            elem.append(a);
            first = false;
            /* Tippy.js tooltip*/
            tippy(a[0], {
                content: contrib.description, 
                arrow: true, 
                animation: 'scale', 
                placement: 'bottom', 
                size: 'large', 
                theme: 'light', 
                touch: true, 
                touchHold: true
            });
        });
    }).fail(function() {
        alert('Cannot load contributors.json');
    });
}

function load_works() {
    $.get('data/works.json', function(data) {
        let works = data;
        works.sort((a, b) => getDate(b.dates[0]) - getDate(a.dates[0]));
        fill_works(works);
    }).fail(function() {
        alert('Cannot load works.json');
    });
}

function load_conferences() {
    $.get('data/conferences.json', function(data) {
        let conferences = data;
        let conferences_array = preprocess(conferences);
        fill_conferences(conferences_array);
    }).fail(function() {
        alert('Cannot load conferences.json');
    });
}

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }
    $_GET[decode(arguments[1])] = decode(arguments[2]);
});

$(document).ready(function() {
    let page_title = 'Deep Learning Chronicle';
    let header_title = '';
    let header_description = '';
    
    /* fill page contents */
    load_contributors();
    if('cate' in $_GET && $_GET['cate'] == 'works') {
        document.title = 'Works - ' + page_title;
        header_title = 'Works';
        description = 'List down the works related to deep learning.';
        $('nav li:eq(0)').addClass('active');
        load_works();
    } else if('cate' in $_GET && $_GET['cate'] == 'conferences') {
        document.title = 'Conferences - ' + page_title;
        header_title = 'Conferences';
        description = 'List down the conferences related to deep learning.<br/>Data are mainly retrieved from <a href="http://www.wikicfp.com">WikiCFP</a>.';
        $('nav li:eq(2)').addClass('active');
        load_conferences();
    } else {
        document.title = page_title;
        header_title = 'Works';
        description = 'List down the works related to deep learning.';
        $('nav li:eq(0)').addClass('active');
        load_works();
    }
    $('#page-content .example-title h2').html(header_title);
    $('#page-content .example-title p').html(description);

    /* smoothly scroll to the top */
    $(window).scroll(function() { 
        if ($(this).scrollTop() > 100) { 
            $('#scroll-to-top').fadeIn(); 
        } else { 
            $('#scroll-to-top').fadeOut(); 
        } 
    }); 
    $('#scroll-to-top').click(function() { 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});