library verilog;
use verilog.vl_types.all;
entity Clock_Divider is
    port(
        clk             : in     vl_logic;
        n_rst           : in     vl_logic;
        clk_div         : out    vl_logic
    );
end Clock_Divider;
