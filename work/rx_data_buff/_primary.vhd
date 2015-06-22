library verilog;
use verilog.vl_types.all;
entity rx_data_buff is
    port(
        clk             : in     vl_logic;
        n_rst           : in     vl_logic;
        load_buffer     : in     vl_logic;
        packet_data     : in     vl_logic_vector(7 downto 0);
        rx_data         : out    vl_logic_vector(7 downto 0);
        data_ready      : out    vl_logic;
        overrun_error   : out    vl_logic
    );
end rx_data_buff;
