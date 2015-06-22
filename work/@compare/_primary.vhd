library verilog;
use verilog.vl_types.all;
entity Compare is
    port(
        fucktonofhashes : in     vl_logic_vector(0 to 8191);
        outputhash      : in     vl_logic_vector(0 to 127);
        match           : out    vl_logic_vector(0 to 6)
    );
end Compare;
