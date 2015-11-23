$(function() {
    var caratteristiche = ['testa', 'occhi', 'naso', 'bocca', 'orecchie'];
    
    function disegnaCaratteristica(caratteristica) {
        var value = $('#' + caratteristica).val();
        $('img.' + caratteristica).attr('src', 'img/' + caratteristica + '/' + value + '.png');
    }

    function disegnaMostro() {
        $.each(caratteristiche, function(idx, caratteristica) {
            disegnaCaratteristica(caratteristica);
        });
        numeroDelMostro();
    }
    
    function numeroDelMostro() {
        var num = 0;
        $.each(caratteristiche, function(idx, caratteristica) {
            var power = caratteristiche.length - 1 - idx;
            num += $('#' + caratteristica)[0].selectedIndex * Math.pow(4, power);
        });
        $('#monster-number').text(num);
        $('#monster-name').text('');
    }
    
    $.each(caratteristiche, function(idx, caratteristica) {
        $('#' + caratteristica).change(function() {
            disegnaCaratteristica(caratteristica);
            numeroDelMostro();
        });
    });
    
    $('#random').click(function() {
        $.each(caratteristiche, function(idx, caratteristica) {
            options = $('#' + caratteristica + ' > option');
            options[Math.floor(Math.random() * options.length)].selected = true
        });
        disegnaMostro();
    });
    
    $('#nome-mostro').click(function() {
        var primo_nome_map = {
            'fanta': $('#testa option[value=fanta]').text(),
            'allegra': $('#testa option[value=allegra]').text(),
            'orribile': $('#testa option[value=orribile]').text(),
            'schifosa': $('#testa option[value=schifosa]').text()
        };
        var secondo_nome_map = {
            'fanta': $('#occhi option[value=fanta]').text(),
            'biz': $('#occhi option[value=biz]').text(),
            'smo': $('#occhi option[value=smo]').text(),
            'spi': $('#occhi option[value=spi]').text()
        };
        var value_count = {
            'fanta': 0,
            'biz': 0,
            'smo': 0,
            'spi': 0
        }
        
        $.each(caratteristiche, function(idx, caratteristica) {
            // skip testa
            if (!idx) {
                return;
            }
            value_count[$('#' + caratteristica).val()] += 1;
        });
        var max_count = 0;
        $.each(value_count, function(value, count) {
            if (max_count == 2 && count == 2) {
                // in caso di parita' 2 a 2 fra le caratteristiche, vincono gli occhi
                max_value = $('#occhi').val();
            }
            if (count > max_count) {
                max_count = count;
                max_value = value;
            }
        });
        if (max_count == 1) {
            // in caso di parita' fra tutte le caratteristiche, vincono gli occhi
            max_value = $('#occhi').val();
        }
        
        var nome = primo_nome_map[$('#testa').val()] + ' ' + secondo_nome_map[max_value];
        $('#monster-name').text(nome);
    });
    
    disegnaMostro();
    
    $(window).on("load resize", function() {
        var image_height = $('.monster-container img')[0].clientHeight;
        $('.monster-container').css('min-height', (image_height) + 'px');
    });
    
    var translator = $('body').translate({lang: "en", t: translations});
    
    $('#language').change(function() {
        translator.lang($(this).val());
    });
});