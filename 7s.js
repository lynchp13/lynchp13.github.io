<!--[if lt IE 9]>
  <script type="text/javascript" src="excanvas.js"></script>
<![endif]-->

<script type="text/javascript" src="segment-display.js"></script>
<script type="text/javascript">

  var display = new SegmentDisplay("display");
  display.pattern         = "##:##:####";
  display.displayAngle    = 6;
  display.digitHeight     = 20;
  display.digitWidth      = 14;
  display.digitDistance   = 2.5;
  display.segmentWidth    = 2;
  display.segmentDistance = 0.3;
  display.segmentCount    = 7;
  display.cornerType      = 3;
  display.colorOn         = "#e95d0f";
  display.colorOff        = "#4b1e05";
  display.draw();

</script>

